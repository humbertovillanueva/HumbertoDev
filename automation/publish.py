"""Publish validated data via an ordinary PR and verify Vercel status."""
import html
import json
import os
from pathlib import Path
import subprocess
import sys
import time
import urllib.request

REPO = 'humbertovillanueva/HumbertoDev'
ROOT = Path(__file__).resolve().parents[1]


def api(path, method='GET', data=None):
    req = urllib.request.Request('https://api.github.com/repos/' + REPO + path,
        headers={'Authorization': 'Bearer ' + os.environ['GH_TOKEN'], 'Accept': 'application/vnd.github+json'},
        method=method, data=json.dumps(data).encode() if data is not None else None)
    with urllib.request.urlopen(req, timeout=45) as response:
        return json.load(response)


def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT, text=True).strip()


def wait_vercel(sha):
    deadline = time.monotonic() + 900
    while time.monotonic() < deadline:
        statuses = api('/commits/' + sha + '/status')['statuses']
        vercel = [s for s in statuses if s['context'].lower() == 'vercel']
        if vercel:
            state = vercel[0]['state']
            if state == 'success':
                return vercel[0]['target_url']
            if state in {'error', 'failure'}:
                raise RuntimeError('Vercel deployment failed: ' + str(vercel[0]['target_url']))
        time.sleep(20)
    raise RuntimeError('No successful Vercel status within 15 minutes; inspect deployment and author access.')


def main():
    if git('diff', '--name-only') != 'app/projects.json':
        raise RuntimeError('Only project data may be published')
    base = os.environ['BASE_SHA']
    if api('/git/ref/heads/main')['object']['sha'] != base:
        raise RuntimeError('Production changed during this run; rerun from current main')
    existing = api('/pulls?state=open&per_page=100')
    if any(pr['head']['ref'].startswith('automation/portfolio-sync-') for pr in existing):
        raise RuntimeError('An automated update is already open; resolve it before another run')
    branch = 'automation/portfolio-sync-' + os.environ['GITHUB_RUN_ID']
    git('checkout', '-b', branch)
    git('config', 'user.name', 'Humberto Villanueva')
    git('config', 'user.email', 'umbertocornejo8@gmail.com')
    git('add', 'app/projects.json')
    git('commit', '-m', 'Update portfolio projects via weekly automation')
    sha = git('rev-parse', 'HEAD')
    git('push', 'origin', branch)
    pr = api('/pulls', 'POST', {'head': branch, 'base': 'main', 'title': 'Weekly portfolio project update',
        'body': 'Automated public-evidence refresh. Data validation, lint, production build and desktop/mobile smoke checks passed before this PR. The workflow waits for Vercel preview success before merging.\n\nRun: https://github.com/' + REPO + '/actions/runs/' + os.environ['GITHUB_RUN_ID']})
    summary = Path(os.environ['GITHUB_STEP_SUMMARY'])
    with summary.open('a') as out:
        out.write('\nPrepared update: ' + pr['html_url'] + '\n')
    preview = wait_vercel(sha)
    if api('/git/ref/heads/main')['object']['sha'] != base:
        raise RuntimeError('Main changed after preview; leave PR for reconciliation')
    merged = api('/pulls/' + str(pr['number']) + '/merge', 'PUT', {'sha': sha, 'merge_method': 'squash'})
    if not merged.get('merged'):
        raise RuntimeError('GitHub did not merge the update')
    deployment = wait_vercel(merged['sha'])
    expected = json.loads((ROOT/'app/projects.json').read_text())
    deadline = time.monotonic() + 180
    while time.monotonic() < deadline:
        req = urllib.request.Request('https://humbertovillanueva.dev/?portfolio-sync=' + merged['sha'], headers={'Cache-Control': 'no-cache'})
        with urllib.request.urlopen(req, timeout=30) as response:
            body = html.unescape(response.read().decode())
        if all(item['title'] in body and item['text'] in body for item in expected):
            with summary.open('a') as out:
                out.write('\nPublished and verified https://humbertovillanueva.dev/\n\nPreview: ' + str(preview) + '\n\nProduction: ' + str(deployment) + '\n')
            return
        time.sleep(15)
    raise RuntimeError('Deployment succeeded but live content verification did not pass')


if __name__ == '__main__':
    main()
