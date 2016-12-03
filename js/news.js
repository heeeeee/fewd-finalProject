/*/////////////////////////////////////////////////////////
 * news.js
 * connects to News API to get articles from National Geographics
 *
 * December 2016
 *
 */////////////////////////////////////////////////////////


$(document).ready(function(){

  // GET news source from news api
  $.ajax({
     type: "GET",
     url: "https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=1eff36b4414c4786abb39ecd8ad16f4c",
     success: function(news) {
         HANDLE.renderTemplate({
           templateSource: "#news-template",
           data: news.articles,
           where: "#all-news",
           clearOriginal: true
         });
      },
      error: function() {
        alert("Error getting news");
      }
  });

});
