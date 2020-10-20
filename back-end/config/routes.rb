Rails.application.routes.draw do
  post '/sessions', to: "sessions#create"
end

