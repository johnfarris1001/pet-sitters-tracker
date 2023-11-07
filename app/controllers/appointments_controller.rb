class AppointmentsController < ApplicationController
    def index
        user = User.find_by(id: session[:user_id])
        appointments = user.appointments
        render json: appointments
    end
end
