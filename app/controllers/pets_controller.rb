class PetsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        pets = current_user.pets.order(age: :desc)
        render json: pets
    end

    def show
        pet = current_user.pets.find(params[:id])
        render json: pet
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
        params.permit(:name, :species, :breed, :weight, :age, :notes, :user_id)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
