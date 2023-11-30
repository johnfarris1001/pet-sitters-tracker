class SittersController < ApplicationController
    wrap_parameters format: []
    skip_before_action :authorize, only: [:index, :show, :create]

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        sitters = Sitter.all.order(name: :asc)
        render json: sitters
    end

    def create
        sitter = Sitter.create!(sitter_params)
        render json: sitter, status: :created
    end

    private

    def sitter_params
        params.permit(:name, :has_home_with_yard, :phone_number, :address, :own_cats, :own_dogs)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
