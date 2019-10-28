module.exports = {
    base: '/blog/', 
    head: [
        ['link', { rel: 'stylesheet', href: `https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900` }],
        ['link', { rel: 'stylesheet', href: `https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css` }]
    ],
    plugins: [
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }]
    ]
}