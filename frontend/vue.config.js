const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html', 
      runtimeCaching: [
        {
          urlPattern: new RegExp('^http://localhost:'),
          handler: 'NetworkFirst',
          options: {
            networkTimeoutSeconds: 20,
            cacheName: 'aon5-note-cache',
            cacheableResponse: {
              statuses:[0,200] 
            },
          }
        },
        {
          urlPattern: new RegExp('^http://localhost:'),
          handler: 'NetworkOnly',
          method: 'POST',
          options: {
            backgroundSync: {
              name: 'queue-aon5',
              options: {
                maxRetentionTime: 60 * 60 * 24,
                forceSyncFallback: true,
              }
            },
          }
        }
      ]
    },
    manifestOptions: {
      "name": "AON5 Notes",
      "short_name": "Notes",
      "start_url": ".",
      "display": "standalone",
      "background_color": "#FFFFFF",
      "theme_color": "#e99c05",
      "orientation": "portrait-primary",
      "icons": [
        {
          "src": "/img/icons/72.png",
          "type": "image/png",
          "sizes": "72x72"
        },
        {
          "src": "/img/icons/96.png",
          "type": "image/png",
          "sizes": "96x96"
        },
        {
          "src": "/img/icons/128.png",
          "type": "image/png",
          "sizes": "128x128"
        },
        {
          "src": "/img/icons/144.png",
          "type": "image/png",
          "sizes": "144x144"
        },
        {
          "src": "/img/icons/152.png",
          "type": "image/png",
          "sizes": "152x152"
        },
        {
          "src": "/img/icons/192.png",
          "type": "image/png",
          "sizes": "192x192"
        },
        {
          "src": "/img/icons/384.png",
          "type": "image/png",
          "sizes": "384x384"
        },
        {
          "src": "/img/icons/512.png",
          "type": "image/png",
          "sizes": "512x512"
        }
      ]
    }
  }
}

