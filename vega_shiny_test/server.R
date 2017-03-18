
# This is the server logic for a Shiny web application.
# You can find out more about building applications with Shiny here:
#
# http://shiny.rstudio.com
#

library(shiny)
library(vegalite)
library(jsonlite)

shinyServer(function(input, output) {

  
  json_file <- "https://vega.github.io/vega-editor/app/data/cars.json"
  json_data <- fromJSON(json_file, flatten = TRUE)
  
  vegalite() %>% 
    add_data(json_data) %>% 
    encode_x("Horsepower") %>% 
    encode_y("Miles_per_Gallon") %>% 
    encode_color("Origin", "nominal") %>% 
    mark_point() -> vl
  
  output$vegaplot <- vegalite::renderVegalite(vl)

})
