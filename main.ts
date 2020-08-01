const k8s = require('@kubernetes/client-node');
const { V1Deployment } = require('@kubernetes/client-node');
// const { V1PodIP, V1Pod, V1Deployment } = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const AppsV1= kc.makeApiClient(k8s.AppsV1Api);
var namespace = {
  metadata: {
    name: 'test'
  }
};
// k8sApi.listNamespacedPod('default').then((res) => {
//     // console.log(res.body)
//     console.log(res.body.items[1].metadata)
//     // console.log(res.body.items[1].spec)
//     // console.log(res.body.items[1].status)
// });
// V1Pod
// k8sApi.createNamespacedPod("default", )
// let c
let x = new V1Deployment({
    apiVersion: 'apps/v1',
    kind: 'Deployment',
    metadata:  {
      labels: { app: 'login' },
      name: 'login',
      namespace: 'default',
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
            // ports: [{
            //   containerPort: 3000,
            // }],
          }],
        },
      },
    },
  });
AppsV1.createNamespacedDeployment('default',x)
.then((res) => {
  console.log(res.body) 
})
.catch((err) => {
        console.log(err);
    });
// AppsV1.listNamespacedDeployment('default').then((res) => {
//     console.log(res.body.items[1])
//     // console.log(res.body.items[1].metadata)
//     // console.log(res.body.items[1].spec)
//     // console.log(res.body.items[1].status)
// });
// Create Namespace
// k8sApi.createNamespace(namespace).then(
//   (response) => {
//     console.log('Created namespace');
//     console.log(response.body);
//     k8sApi.readNamespace(namespace.metadata.name).then(
//       (response) => {
//         console.log(response.response);
// 	k8sApi.deleteNamespace(
//           namespace.metadata.name, {} /* delete options */);
//       });
//   },
//   (err) => {
//     console.log('Error!: ' + err);
//   }
// );
