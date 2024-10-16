<a name="readme-top"></a>

<h1>Novita Image Plugin</h1>

## About

This is an unoffical plugin to generate images using the [Novita.ai](https://novita.ai) API in Lobe Chat.

## Usage

1. Clone repository

```
git clone 
```

2. Start Novita Gateway using docker

```
docker-compose build
docker-compose up -d
```

3. Add new Plugin to LobeChat

*Add image plugin as link response*
```
http://127.0.0.1:3000/manifest.json
```

4. Configure [API Key](https://novita.ai/settings) & model settings in the plugin settings in Lobe Chat.

## Change Log

[Change Log](CHANGELOG.md)