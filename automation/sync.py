"""Collect public evidence and validate data-only portfolio proposals."""
import base64
import datetime as dt
import json
import os
from pathlib import Path
import re
import sys
import urllib.error
import urllib.request
from zoneinfo import ZoneInfo

OWNER = 'humbertovillanueva'
ROOT = Path(__file__).resolve().parents[1]
FIELDS = {'title': 80, 'type': 100, 'text': 600, 'stack': 180, 'repo': 100, 'status': 24}


def github(path):
    headers = {'Accept': 'application/vnd.github+json', 'User-Agent': 'portfolio-sync'}
    if os.environ.get('GH_TOKEN'):
        headers['Authorization'] = 'Bearer ' + os.environ['GH_TOKEN']
    with urllib.request.urlopen(urllib.request.Request('https://api.github.com' + path, headers=headers), timeout=45) as response:
        return json.load(response)


def collect(destination):
    evidence = []
    page = 1
    while True:
        batch = github(f'/users/{OWNER}/repos?per_page=100&page={page}')
        if not batch:
            break
        for repo in batch:
            if repo['private'] or repo['fork'] or repo['archived'] or repo['name'] in {'HumbertoDev', OWNER, 'portfoliofinal', 'it497-portfolio'}:
                continue
            prefix = f'/repos/{OWNER}/{repo["name"]}'
            sha = github(prefix + '/commits/' + repo['default_branch'])['sha']
            files = {}
            # All files are pinned to the same reviewed revision. Never execute source projects.
            for filename in ['README.md', 'package.json', 'pyproject.toml', 'requirements.txt']:
                try:
                    file = github(prefix + '/contents/' + filename + '?ref=' + sha)
                    if file.get('encoding') == 'base64':
                        files[filename] = base64.b64decode(file['content']).decode('utf-8')[:22000]
                except urllib.error.HTTPError as error:
                    if error.code != 404:
                        raise
            evidence.append({'repo': repo['name'], 'sha': sha, 'description': repo['description'], 'files': files})
        page += 1
    result = {'repositories': evidence, 'live_site': ''}
    with urllib.request.urlopen('https://humbertovillanueva.dev/', timeout=45) as response:
        result['live_site'] = response.read(200000).decode('utf-8')
    Path(destination).write_text(json.dumps(result, ensure_ascii=False))
    print(f'Collected {len(evidence)} public repositories and the live portfolio.')


def validate(proposal, current, evidence):
    if not isinstance(proposal, dict) or set(proposal) != {'projects'}:
        raise ValueError('Expected a projects object')
    items = proposal['projects']
    if not isinstance(items, list) or not len(current) <= len(items) <= 20:
        raise ValueError('No removal of existing projects; maximum 20 cards')
    allowed = {r['repo'] for r in evidence['repositories']}
    seen_titles, seen_repos = set(), set()
    for item in items:
        if not isinstance(item, dict) or set(item) != set(FIELDS):
            raise ValueError('Unexpected card fields')
        for field, maximum in FIELDS.items():
            value = item[field]
            if not isinstance(value, str) or len(value) > maximum or (field != 'repo' and not value.strip()):
                raise ValueError('Invalid ' + field)
            if any(ord(c) < 32 for c in value) or '<' in value or '>' in value:
                raise ValueError('Control characters or markup are not allowed')
        title = item['title'].casefold()
        if title in seen_titles:
            raise ValueError('Duplicate title')
        seen_titles.add(title)
        repo = item['repo']
        if not repo and item not in current:
            raise ValueError('New projects require a verified repository')
        if repo:
            if repo not in allowed or not re.fullmatch(r'[A-Za-z0-9_.-]+', repo) or repo in seen_repos:
                raise ValueError('Unverified or duplicate repository')
            seen_repos.add(repo)
    for old in current:
        if not old['repo'] and old not in items:
            raise ValueError('Existing manually curated projects are immutable')
        if old['repo'] and not any(i['repo'] == old['repo'] for i in items):
            raise ValueError('Removing managed projects requires manual review')
    return items


def apply(proposal_path, evidence_path):
    target = ROOT / 'app/projects.json'
    current = json.loads(target.read_text())
    items = validate(json.loads(Path(proposal_path).read_text()), current, json.loads(Path(evidence_path).read_text()))
    if items != current:
        target.write_text(json.dumps(items, ensure_ascii=False, indent=2) + '\n')
        print('Portfolio data updated.')
    else:
        print('Portfolio already current.')


def due(now=None):
    local = (now or dt.datetime.now(dt.timezone.utc)).astimezone(ZoneInfo('America/Denver'))
    return local.weekday() == 6 and local.hour == 3


if __name__ == '__main__':
    command = sys.argv[1]
    if command == 'collect':
        collect(sys.argv[2])
    elif command == 'apply':
        apply(sys.argv[2], sys.argv[3])
    elif command == 'due':
        print('true' if due() else 'false')
    else:
        raise SystemExit('Unknown command')
