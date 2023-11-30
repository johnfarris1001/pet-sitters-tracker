Rails.application.routes.draw do
  
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/users', to: 'users#index'
  
  resources :appointments, only: [:index, :create, :update, :destroy]
  resources :sitters, only: [:index, :show, :create]
  resources :pets, only: [:index, :create]
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
