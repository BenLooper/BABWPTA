Rails.application.routes.draw do

  resources :users

  post '/sessions', to: "sessions#create"

end

