class AppointmentsController < ApplicationController
    def index
        user = User.find_by(id: session[:user_id])
        appointments = user.appointments.order(start_date: :desc)
        render json: appointments
    end

    def destroy
        appointment = Appointment.find_by(id: params[:id])
        if appointment
            appointment.destroy
            head :no_content
        else
            render json: { error: "Appointment not found" }, status: :not_found
        end
    end
end
