@echo off
SET NPM_LS=npm ls  --depth=0 --prod=true --parseable=false
SET JQ_LIC=jq -r -R -f license-list.jq
%NPM_LS% 2> nul | %JQ_LIC%
