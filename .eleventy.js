const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const pluginSEO = require("eleventy-plugin-seo");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function(eleventyConfig) {
    // Add plugins
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    
    eleventyConfig.addPlugin(pluginSEO, {
        title: "తెలుగు వార్తలు",
        description: "తాజా తెలుగు వార్తలు, బ్రేకింగ్ న్యూస్",
        url: "https://teluguudayam.com",
        author: "Telugu News Team",
        twitter: "telugunews",
        image: "/images/og-image.jpg"
    });

    eleventyConfig.addPlugin(sitemap, {
        sitemap: {
            hostname: "https://teluguudayam.com",
        },
    });

    // Passthrough copies
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("admin");

    // Collections
    eleventyConfig.addCollection("news", function(collection) {
        return collection.getFilteredByGlob("src/_posts/*.md");
    });

    // Add custom filters
    eleventyConfig.addFilter("isoDate", function(date) {
        return date.toISOString().split('T')[0];
    });
    
    eleventyConfig.addFilter("readableDate", function(date) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('te-IN', options);
    });
    
    eleventyConfig.addFilter("truncate", function(str, length) {
        if (!str) return '';
        if (str.length <= length) return str;
        return str.substring(0, length) + '...';
    });
    
    // Add this filter for absolute URLs
    eleventyConfig.addFilter("absoluteUrl", (url) => {
        const siteUrl = process.env.URL || "https://teluguudayam.com";
        return new URL(url, siteUrl).toString();
    });

    // Add social media specific collections
    eleventyConfig.addCollection("popularNews", function(collection) {
        return collection.getFilteredByGlob("src/_posts/*.md")
            .filter(item => item.data.categories && item.data.categories.includes('featured'))
            .slice(0, 5);
    });

    // Category collections
    eleventyConfig.addCollection("stateNews", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/_posts/*.md").filter(item => {
            return item.data.categories && item.data.categories.includes("state");
        });
    });
    
    eleventyConfig.addCollection("nationalNews", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/_posts/*.md").filter(item => {
            return item.data.categories && item.data.categories.includes("national");
        });
    });

    // Category filter
    eleventyConfig.addFilter("filterByCategory", function(posts, category) {
        return posts.filter(post => {
            return post.data.categories && post.data.categories.includes(category);
        });
    });

 // Individual category collections
    eleventyConfig.addCollection("internationalNews", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/_posts/*.md").filter(item => {
            return item.data.categories && item.data.categories.includes("international");
        });
    });
    
    eleventyConfig.addCollection("sportsNews", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/_posts/*.md").filter(item => {
            return item.data.categories && item.data.categories.includes("sports");
        });
    });
    
    eleventyConfig.addCollection("cinemaNews", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/_posts/*.md").filter(item => {
            return item.data.categories && item.data.categories.includes("cinema");
        });
    });
    
    eleventyConfig.addCollection("businessNews", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/_posts/*.md").filter(item => {
            return item.data.categories && item.data.categories.includes("business");
        });
    });    

    // Add this filter to your existing .eleventy.js
    eleventyConfig.addFilter("excludeCurrent", function(posts, currentUrl) {
        return posts.filter(post => post.url !== currentUrl);
    });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            layouts: "_layouts",
            data: "_data"
        },
        templateFormats: ["md", "njk", "html", "liquid"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        passthroughFileCopy: true        
    };
};
