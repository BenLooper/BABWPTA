Rails.application.routes.draw do

  resources :users

  post '/sessions', to: "sessions#create"

  post '/games', to: 'games#create'

  patch '/games/:id', to: 'games#update'

  delete '/games/:id', to: 'games#destroy'

  patch '/users/:id', to: 'users#update'


end

