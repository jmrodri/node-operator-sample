const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const AppsV1= kc.makeApiClient(k8s.AppsV1Api);

let deployment = {
    apiVersion: 'apps/v1',
    kind: 'Deployment',
    metadata:  {
      name: 'login',
      namespace: 'default',
      labels: { app: 'login' },
    },
    spec: {
      replicas: 1,
      selector:  {
        matchLabels: { app: 'login' },
      },
      template:  {
        metadata:  {
          labels: { app: 'login' },
        },
        spec: {
          containers: [{
            name: 'login',
            image: 'venkat19967/login',
            ports: [{
              containerPort: 3000,
            }],
          }],
        },
      },
    },
  };

console.log(deployment)

AppsV1.createNamespacedDeployment('default', deployment)
.then((res) => {
    console.log(res.body)
})
.catch((err) => {
    console.log(err);
});
