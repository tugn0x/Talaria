---
title: API Reference

language_tabs:
- bash
- javascript

includes:

search: true

toc_footers:
- <a href='http://github.com/mpociot/documentarian'>Documentation Powered by Documentarian</a>
---
<!-- START_INFO -->
# Info

Welcome to the generated API reference.
[Get Postman Collection](http://api.nilde.local/docs/collection.json)

<!-- END_INFO -->

#general
<!-- START_7ebdd0ac8b3cd321e05382d1c06cd0b1 -->
## Get the key performance stats for the dashboard.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/horizon/api/stats" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/stats");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (500):

```json
{
    "message": "Server Error"
}
```

### HTTP Request
`GET horizon/api/stats`


<!-- END_7ebdd0ac8b3cd321e05382d1c06cd0b1 -->

<!-- START_5abc89804e68469f8260c0ded520f59c -->
## Get the current queue workload for the application.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/horizon/api/workload" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/workload");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (500):

```json
{
    "message": "Server Error"
}
```

### HTTP Request
`GET horizon/api/workload`


<!-- END_5abc89804e68469f8260c0ded520f59c -->

<!-- START_7d6f8da3e735f9175246fbab4b37610c -->
## Get all of the master supervisors and their underlying supervisors.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/horizon/api/masters" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/masters");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (500):

```json
{
    "message": "Server Error"
}
```

### HTTP Request
`GET horizon/api/masters`


<!-- END_7d6f8da3e735f9175246fbab4b37610c -->

<!-- START_3a653cb977489e73ed8798e5705defbf -->
## Get all of the monitored tags and their job counts.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/horizon/api/monitoring" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/monitoring");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (500):

```json
{
    "message": "Server Error"
}
```

### HTTP Request
`GET horizon/api/monitoring`


<!-- END_3a653cb977489e73ed8798e5705defbf -->

<!-- START_970935b1e560143fd003dd90a6f0b7b0 -->
## Start monitoring the given tag.

> Example request:

```bash
curl -X POST "http://api.nilde.local/horizon/api/monitoring" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/monitoring");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST horizon/api/monitoring`


<!-- END_970935b1e560143fd003dd90a6f0b7b0 -->

<!-- START_abd3993e15d364e7a2c79c9caa73a862 -->
## Paginate the jobs for a given tag.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/horizon/api/monitoring/1" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/monitoring/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (500):

```json
{
    "message": "Server Error"
}
```

### HTTP Request
`GET horizon/api/monitoring/{tag}`


<!-- END_abd3993e15d364e7a2c79c9caa73a862 -->

<!-- START_9f62e45bc2a894b92554c1406f487f03 -->
## Stop monitoring the given tag.

> Example request:

```bash
curl -X DELETE "http://api.nilde.local/horizon/api/monitoring/1" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/monitoring/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "DELETE",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`DELETE horizon/api/monitoring/{tag}`


<!-- END_9f62e45bc2a894b92554c1406f487f03 -->

<!-- START_9808e9d7d776f039d57c72f052e6e8cc -->
## Get all of the measured jobs.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/horizon/api/metrics/jobs" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/metrics/jobs");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (500):

```json
{
    "message": "Server Error"
}
```

### HTTP Request
`GET horizon/api/metrics/jobs`


<!-- END_9808e9d7d776f039d57c72f052e6e8cc -->

<!-- START_dbb28dc188d668f7fa836ee5bc43e243 -->
## Get metrics for a given job.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/horizon/api/metrics/jobs/1" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/metrics/jobs/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (500):

```json
{
    "message": "Server Error"
}
```

### HTTP Request
`GET horizon/api/metrics/jobs/{id}`


<!-- END_dbb28dc188d668f7fa836ee5bc43e243 -->

<!-- START_ca0a10e3b27a3c5820831f79ab403f78 -->
## Get all of the measured queues.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/horizon/api/metrics/queues" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/metrics/queues");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (500):

```json
{
    "message": "Server Error"
}
```

### HTTP Request
`GET horizon/api/metrics/queues`


<!-- END_ca0a10e3b27a3c5820831f79ab403f78 -->

<!-- START_7a3c56bda1e4b728cf5a5691ee989766 -->
## Get metrics for a given queue.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/horizon/api/metrics/queues/1" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/metrics/queues/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (500):

```json
{
    "message": "Server Error"
}
```

### HTTP Request
`GET horizon/api/metrics/queues/{id}`


<!-- END_7a3c56bda1e4b728cf5a5691ee989766 -->

<!-- START_c34fa16bca5eb044bd9b7d7643c3376a -->
## Get all of the recent jobs.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/horizon/api/jobs/recent" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/jobs/recent");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (500):

```json
{
    "message": "Server Error"
}
```

### HTTP Request
`GET horizon/api/jobs/recent`


<!-- END_c34fa16bca5eb044bd9b7d7643c3376a -->

<!-- START_73a5f0771b8fdd710e2b547f24f1b308 -->
## Get all of the failed jobs.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/horizon/api/jobs/failed" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/jobs/failed");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (500):

```json
{
    "message": "Server Error"
}
```

### HTTP Request
`GET horizon/api/jobs/failed`


<!-- END_73a5f0771b8fdd710e2b547f24f1b308 -->

<!-- START_25959bfc2e37e26b5875453cbf717c3f -->
## Get a failed job instance.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/horizon/api/jobs/failed/1" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/jobs/failed/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (500):

```json
{
    "message": "Server Error"
}
```

### HTTP Request
`GET horizon/api/jobs/failed/{id}`


<!-- END_25959bfc2e37e26b5875453cbf717c3f -->

<!-- START_b69e44e22af794a2060e89edd04f0600 -->
## Retry a failed job.

> Example request:

```bash
curl -X POST "http://api.nilde.local/horizon/api/jobs/retry/1" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/api/jobs/retry/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST horizon/api/jobs/retry/{id}`


<!-- END_b69e44e22af794a2060e89edd04f0600 -->

<!-- START_fb7b7b4614d0392062e423beed14f31f -->
## Single page application catch-all route.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/horizon/1" 
```
```javascript
const url = new URL("http://api.nilde.local/horizon/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
null
```

### HTTP Request
`GET horizon/{view?}`


<!-- END_fb7b7b4614d0392062e423beed14f31f -->

<!-- START_0c068b4037fb2e47e71bd44bd36e3e2a -->
## Authorize a client to access the user&#039;s account.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/oauth/authorize" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/authorize");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`GET oauth/authorize`


<!-- END_0c068b4037fb2e47e71bd44bd36e3e2a -->

<!-- START_e48cc6a0b45dd21b7076ab2c03908687 -->
## Approve the authorization request.

> Example request:

```bash
curl -X POST "http://api.nilde.local/oauth/authorize" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/authorize");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST oauth/authorize`


<!-- END_e48cc6a0b45dd21b7076ab2c03908687 -->

<!-- START_de5d7581ef1275fce2a229b6b6eaad9c -->
## Deny the authorization request.

> Example request:

```bash
curl -X DELETE "http://api.nilde.local/oauth/authorize" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/authorize");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "DELETE",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`DELETE oauth/authorize`


<!-- END_de5d7581ef1275fce2a229b6b6eaad9c -->

<!-- START_a09d20357336aa979ecd8e3972ac9168 -->
## Authorize a client to access the user&#039;s account.

> Example request:

```bash
curl -X POST "http://api.nilde.local/oauth/token" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/token");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST oauth/token`


<!-- END_a09d20357336aa979ecd8e3972ac9168 -->

<!-- START_d6a56149547e03307199e39e03e12d1c -->
## Get all of the authorized tokens for the authenticated user.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/oauth/tokens" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/tokens");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`GET oauth/tokens`


<!-- END_d6a56149547e03307199e39e03e12d1c -->

<!-- START_a9a802c25737cca5324125e5f60b72a5 -->
## Delete the given token.

> Example request:

```bash
curl -X DELETE "http://api.nilde.local/oauth/tokens/1" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/tokens/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "DELETE",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`DELETE oauth/tokens/{token_id}`


<!-- END_a9a802c25737cca5324125e5f60b72a5 -->

<!-- START_abe905e69f5d002aa7d26f433676d623 -->
## Get a fresh transient token cookie for the authenticated user.

> Example request:

```bash
curl -X POST "http://api.nilde.local/oauth/token/refresh" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/token/refresh");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST oauth/token/refresh`


<!-- END_abe905e69f5d002aa7d26f433676d623 -->

<!-- START_babcfe12d87b8708f5985e9d39ba8f2c -->
## Get all of the clients for the authenticated user.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/oauth/clients" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/clients");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`GET oauth/clients`


<!-- END_babcfe12d87b8708f5985e9d39ba8f2c -->

<!-- START_9eabf8d6e4ab449c24c503fcb42fba82 -->
## Store a new client.

> Example request:

```bash
curl -X POST "http://api.nilde.local/oauth/clients" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/clients");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST oauth/clients`


<!-- END_9eabf8d6e4ab449c24c503fcb42fba82 -->

<!-- START_784aec390a455073fc7464335c1defa1 -->
## Update the given client.

> Example request:

```bash
curl -X PUT "http://api.nilde.local/oauth/clients/1" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/clients/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "PUT",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`PUT oauth/clients/{client_id}`


<!-- END_784aec390a455073fc7464335c1defa1 -->

<!-- START_1f65a511dd86ba0541d7ba13ca57e364 -->
## Delete the given client.

> Example request:

```bash
curl -X DELETE "http://api.nilde.local/oauth/clients/1" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/clients/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "DELETE",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`DELETE oauth/clients/{client_id}`


<!-- END_1f65a511dd86ba0541d7ba13ca57e364 -->

<!-- START_9e281bd3a1eb1d9eb63190c8effb607c -->
## Get all of the available scopes for the application.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/oauth/scopes" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/scopes");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`GET oauth/scopes`


<!-- END_9e281bd3a1eb1d9eb63190c8effb607c -->

<!-- START_9b2a7699ce6214a79e0fd8107f8b1c9e -->
## Get all of the personal access tokens for the authenticated user.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/oauth/personal-access-tokens" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/personal-access-tokens");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`GET oauth/personal-access-tokens`


<!-- END_9b2a7699ce6214a79e0fd8107f8b1c9e -->

<!-- START_a8dd9c0a5583742e671711f9bb3ee406 -->
## Create a new personal access token for the user.

> Example request:

```bash
curl -X POST "http://api.nilde.local/oauth/personal-access-tokens" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/personal-access-tokens");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST oauth/personal-access-tokens`


<!-- END_a8dd9c0a5583742e671711f9bb3ee406 -->

<!-- START_bae65df80fd9d72a01439241a9ea20d0 -->
## Delete the given token.

> Example request:

```bash
curl -X DELETE "http://api.nilde.local/oauth/personal-access-tokens/1" 
```
```javascript
const url = new URL("http://api.nilde.local/oauth/personal-access-tokens/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "DELETE",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`DELETE oauth/personal-access-tokens/{token_id}`


<!-- END_bae65df80fd9d72a01439241a9ea20d0 -->

<!-- START_1be41c14d191385d9f224b0929f64fd0 -->
## libraries
> Example request:

```bash
curl -X GET -G "http://api.nilde.local/libraries" 
```
```javascript
const url = new URL("http://api.nilde.local/libraries");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`GET libraries`


<!-- END_1be41c14d191385d9f224b0929f64fd0 -->

<!-- START_66e08d3cc8222573018fed49e121e96d -->
## Show the application&#039;s login form.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/login" 
```
```javascript
const url = new URL("http://api.nilde.local/login");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
null
```

### HTTP Request
`GET login`


<!-- END_66e08d3cc8222573018fed49e121e96d -->

<!-- START_ba35aa39474cb98cfb31829e70eb8b74 -->
## Handle a login request to the application.

> Example request:

```bash
curl -X POST "http://api.nilde.local/login" 
```
```javascript
const url = new URL("http://api.nilde.local/login");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST login`


<!-- END_ba35aa39474cb98cfb31829e70eb8b74 -->

<!-- START_e65925f23b9bc6b93d9356895f29f80c -->
## Log the user out of the application.

> Example request:

```bash
curl -X POST "http://api.nilde.local/logout" 
```
```javascript
const url = new URL("http://api.nilde.local/logout");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST logout`


<!-- END_e65925f23b9bc6b93d9356895f29f80c -->

<!-- START_ff38dfb1bd1bb7e1aa24b4e1792a9768 -->
## Show the application registration form.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/register" 
```
```javascript
const url = new URL("http://api.nilde.local/register");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
null
```

### HTTP Request
`GET register`


<!-- END_ff38dfb1bd1bb7e1aa24b4e1792a9768 -->

<!-- START_d7aad7b5ac127700500280d511a3db01 -->
## Handle a registration request for the application.

> Example request:

```bash
curl -X POST "http://api.nilde.local/register" 
```
```javascript
const url = new URL("http://api.nilde.local/register");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST register`


<!-- END_d7aad7b5ac127700500280d511a3db01 -->

<!-- START_d72797bae6d0b1f3a341ebb1f8900441 -->
## Display the form to request a password reset link.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/password/reset" 
```
```javascript
const url = new URL("http://api.nilde.local/password/reset");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
null
```

### HTTP Request
`GET password/reset`


<!-- END_d72797bae6d0b1f3a341ebb1f8900441 -->

<!-- START_feb40f06a93c80d742181b6ffb6b734e -->
## Send a reset link to the given user.

> Example request:

```bash
curl -X POST "http://api.nilde.local/password/email" 
```
```javascript
const url = new URL("http://api.nilde.local/password/email");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST password/email`


<!-- END_feb40f06a93c80d742181b6ffb6b734e -->

<!-- START_e1605a6e5ceee9d1aeb7729216635fd7 -->
## Display the password reset view for the given token.

If no token is present, display the link request form.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/password/reset/1" 
```
```javascript
const url = new URL("http://api.nilde.local/password/reset/1");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (200):

```json
null
```

### HTTP Request
`GET password/reset/{token}`


<!-- END_e1605a6e5ceee9d1aeb7729216635fd7 -->

<!-- START_cafb407b7a846b31491f97719bb15aef -->
## Reset the given user&#039;s password.

> Example request:

```bash
curl -X POST "http://api.nilde.local/password/reset" 
```
```javascript
const url = new URL("http://api.nilde.local/password/reset");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


### HTTP Request
`POST password/reset`


<!-- END_cafb407b7a846b31491f97719bb15aef -->

<!-- START_cb859c8e84c35d7133b6a6c8eac253f8 -->
## Show the application dashboard.

> Example request:

```bash
curl -X GET -G "http://api.nilde.local/home" 
```
```javascript
const url = new URL("http://api.nilde.local/home");

let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```

> Example response (401):

```json
{
    "message": "Unauthenticated."
}
```

### HTTP Request
`GET home`


<!-- END_cb859c8e84c35d7133b6a6c8eac253f8 -->


