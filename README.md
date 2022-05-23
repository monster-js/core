## What is MonsterJS?

MonsterJS is a javascript framework for building web applications. This framework is based on web components which is good for encapsulating components and building micro frontend apps. This framework is not using virtual dom, instead it will attache a watcher to a bindings and update it only when necessary. This feature is what makes it fast and have a better client run-time performance and memory efficient than virtual dom.

Official docs https://monster-js.github.io/docs-v1/ .

## Create app

Clone the starter app from [GitHub](https://github.com/monster-js/starter-app).

```bash
git clone https://github.com/monster-js/starter-app.git monster-app
```
After cloning the repository, change directory into the starter project

```bash
cd monster-app
```

then install the dependencies

```bash
npm install
```
Start the local development server by running the following command:

```bash
npm start
```
Now we can view our app by pointing our browsers to [http://localhost:4000](http://localhost:4000)