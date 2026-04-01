$runs = Invoke-RestMethod -Uri "https://api.github.com/repos/sayan-stack/llm-regex-extractor/actions/runs"
$latestRunId = $runs.workflow_runs[0].id
$jobs = Invoke-RestMethod -Uri "https://api.github.com/repos/sayan-stack/llm-regex-extractor/actions/runs/$latestRunId/jobs"
$latestJobId = $jobs.jobs[0].id

$logUrl = "https://api.github.com/repos/sayan-stack/llm-regex-extractor/actions/jobs/$latestJobId/logs"
try {
    $response = Invoke-WebRequest -Uri $logUrl -ErrorAction Stop
    $response.Content
} catch {
    Write-Host "Failed to fetch logs: $_"
}
