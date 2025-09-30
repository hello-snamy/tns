const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const pluginSEO = require("eleventy-plugin-seo");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function(eleventyConfig) {
    // Add plugins
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    
    eleventyConfig.addPlugin(pluginSEO, {
        title: "తెలుగు వార్తలు",
        description: "తాజా తెలుగు వార్తలు, బ్రేకింగ్ న్యూస్",
        url: "https://telugu-news-app.netlify.app",
        author: "Telugu News Team",
        twitter: "telugunews",
        image: "/images/og-image.jpg"
    });

    eleventyConfig.addPlugin(sitemap, {
        sitemap: {
            hostname: "https://telugu-news-app.netlify.app",
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

    // Add this filter for absolute URLs
    eleventyConfig.addFilter("absoluteUrl", (url) => {
        const siteUrl = process.env.URL || "https://your-site.netlify.app";
        return new URL(url, siteUrl).toString();
    });

    // Add social media specific collections
    eleventyConfig.addCollection("popularNews", function(collection) {
        return collection.getFilteredByGlob("src/_posts/*.md")
            .filter(item => item.data.categories && item.data.categories.includes('featured'))
            .slice(0, 5);
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
        dataTemplateEngine: "njk"
    };
};
