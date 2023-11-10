class PetsController < ApplicationController
    def index
        user = User.find_by(id: session[:user_id])
        pets = user.pets
        render json: pets
    end

    def create
        pet = Pet.create(pet_params)
        render json: pet, status: :created
    end

    private

    def pet_params
        params.permit(:name, :species, :breed, :weight, :age, :notes)
    end
end
