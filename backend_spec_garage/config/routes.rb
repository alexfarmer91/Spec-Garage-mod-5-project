Rails.application.routes.draw do
  resources :follows
  resources :car_likes
  resources :videos
  resources :photos
  resources :parts
  resources :cars
  resources :login, only: [:create]
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
