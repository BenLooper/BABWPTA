Rails.application.routes.draw do

  resources :users

  post '/sessions', to: "sessions#create"

  post '/games', to: 'games#create'

  patch '/users/:id', to: 'users#update'
end

