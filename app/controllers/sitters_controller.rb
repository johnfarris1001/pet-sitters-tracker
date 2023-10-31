class SittersController < ApplicationController
    def index
        sitters = Sitter.all
        render json: sitters
    end

    def show
        sitter = Sitter.find(params[:id])
        render json: sitter
    end

    def create
        sitter = Sitter.create(sitter_params)
        render json: sitter, status: :created
    end

    private

    def sitter_params
        params.permit(:name, :has_home_with_yard, :phone_number, :address, :own_cats, :own_dogs)
    end

end
