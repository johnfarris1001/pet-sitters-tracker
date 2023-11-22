class PetsController < ApplicationController
    wrap_parameters format: []

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        pets = current_user.pets.order(age: :desc)
        render json: pets
    end

    def create
        pet = Pet.create!(pet_params.merge!({'user_id': current_user.id}))
        render json: pet, status: :created
    end

    private
    
    def current_user
        User.find_by(id: session[:user_id])
    end

    def pet_params
        params.permit(:name, :species, :breed, :weight, :age, :notes)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
