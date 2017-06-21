# k8s-example

Simple example service deployed with Kubernetes. Can run on Google Container
Engine with zero additional configuration. Also demonstrates service discovery
via DNS.

## TODO

- [ ] figure out how CI works - how do we replace the version in
  [`k8s/deployment.yaml`](./k8s/deployment.yaml) with the version of
  the latest build?
- [ ] find an easy way to configure Google project, service name, etc.
  without needing to manually edit text files

## dependencies

- [Docker](https://www.docker.com/) for running containers. You might
  also need to install a VM runner like
  [VirtualBox](https://www.virtualbox.org/) if you haven't already.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/install-kubectl/), the Kubernetes command-line interface
- [`minikube`](https://github.com/kubernetes/minikube), an environment
  for running Kubernetes locally
- [`telepresence`](http://www.telepresence.io/), a tool for proxying
  services to a local machine for development

If you are deploying to Google Cloud, you will also need the
[Google Cloud SDK](https://cloud.google.com/sdk/).

## build

`./build.sh $GOOGLE_CLOUD_PROJECT $VERSION` will build a container
with the specified version and push it to a registry in Google Cloud.

Example: `./build.sh fulgid-dev v2` will build a container version at
`gcr.io/fulgid-dev/hello-k8s:v2`

## running locally

- install [minikube](https://github.com/kubernetes/minikube)
- ensure you are using the correct `kubectl` context
- `kubectl config view` to see available contexts
- `kubectl config current-context` to see the current context
- `kubectl config use-context minikube` to use the minikube context
- `make deploy`

## developing services locally

Hypothetically, you might use k8s to deploy dozens of services with
one command. This makes local development easy, because you don't have
to run all the dependent services yourself. We can proxy a particular
service to localhost so that you can run it locally, but still have
k8s manage all the other services you don't care about. This can be
done whether the environment is local (on minikube) or remote (on
GCE).

- install [telepresence](https://telepresence.io)
- run the service
- `make hotswap` will boot up a proxy container connected to your
  local filesystem
- make edits with your usual toolchain
- run `node index.js` to run the service from your machine

## running in Google Container Engine

- create a project in Google Cloud
- initialize GCE and create a cluster
- `gcloud config set project $YOUR_PROJECT`
- search this repo for `fulgid-dev` and replace it with the name of your project
- ensure you're using the correct `kubectl` context
- `kubectl config view` to see available contexts
- `kubectl config current-context` to see the current context
- `kubectl config use-context $CONTEXT` to use a context
- `make deploy`

## helpful links

- [rapid development with telepresence](http://www.telepresence.io/tutorials/kubernetes-rapid.html)
- [guestbook development example](https://cloud.google.com/community/tutorials/developing-services-with-k8s#the-guestbook-application)
- [example all-in-one config file](https://github.com/kubernetes/kubernetes/blob/master/examples/guestbook/all-in-one/guestbook-all-in-one.yaml)
- [k8s config tips](https://kubernetes.io/docs/concepts/configuration/overview/)
- [connecting services with DNS](https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/)
- [minikube quickstart](https://kubernetes.io/docs/getting-started-guides/minikube/#quickstart)
- [GCE tutorial that covers a lot of this shiz](https://cloud.google.com/container-engine/docs/tutorials/hello-node)
