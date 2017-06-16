APP_NAME=hello-k8s
DEPLOYMENT_NAME=$(APP_NAME)-deployment
PORT=8080
REGISTRY=gcr.io/fulgid-dev

.PHONY: deploy hotswap

deploy:
	kubectl apply -f k8s

hotswap:
	telepresence -m inject-tcp --swap-deployment $(DEPLOYMENT_NAME) --expose $(PORT) --run-shell

