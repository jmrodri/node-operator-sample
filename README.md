# Notes

The original implementation had the following error:

```
body: {
      kind: 'Status',
      apiVersion: 'v1',
      metadata: {},
      status: 'Failure',
      message: 'Deployment.apps "" is invalid: [metadata.name: Required value: name or generateName is r
equired, spec.selector: Required value, spec.template.metadata.labels: Invalid value: map[string]string(
nil): `selector` does not match template `labels`, spec.template.spec.containers: Required value]',
      reason: 'Invalid',
      details: [Object],
      code: 422
    },
    [Symbol(kCapture)]: false
```

So when I printed `console.log(x)` it printed: `V1Deployment{}`. And there was
nothing created in the server:

```
[jesusr@transam node-operator{master}]$ kubectl get deployment
No resources found.
[jesusr@transam node-operator{master}]$ kubectl get pod login
No resources found.
Error from server (NotFound): pods "login" not found
```

I changed the creation of `deployment` from `let deployment =
V1Deployment({...})` to `let deployment = { ... }`.

Then I ran it:
```
[jesusr@transam node-operator{master}]$ node main.ts
{
  apiVersion: 'apps/v1',
  kind: 'Deployment',
  metadata: { name: 'login', namespace: 'default', labels: { app: 'login' } },
  spec: {
    replicas: 1,
    selector: { matchLabels: [Object] },
    template: { metadata: [Object], spec: [Object] }
  }
}
V1Deployment {
...

```

Then the resources were created in the cluster:

```
[jesusr@transam node-operator{master}]$ kubectl get deployment
NAME      READY     UP-TO-DATE   AVAILABLE   AGE
login     1/1       1            1           38s
[jesusr@transam node-operator{master}]$ kubectl get pod
NAME                    READY     STATUS    RESTARTS   AGE
login-cf847475b-tzj87   1/1       Running   0          42s
```
