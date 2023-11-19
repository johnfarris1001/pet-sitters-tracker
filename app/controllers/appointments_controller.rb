class AppointmentsController < ApplicationController
    def index
        appointments = current_user.appointments.order(start_date: :desc)
        render json: appointments
    end

    def destroy
        appointment = current_user.appointments.find_by(id: params[:id])
        if appointment
            appointment.destroy
            head :no_content
        else
            render json: { error: "Appointment not found" }, status: :not_found
        end
    end

    def create
        appointment = Appointment.create(appointment_params)
        render json: appointment, status: :created
    end

    def update
        appointment = current_user.appointments.find_by(id: params[:id])
        if appointment
            appointment.update(appointment_params)
            render json: appointment, status: :accepted
        else
            render json: { error: "Appointment not found" }, status: :not_found
        end
    end

    private

    def current_user
        User.find_by(id: session[:user_id])
    end

    def appointment_params
        params.permit(:category, :start_date, :days, :notes, :pet_id, :sitter_id, :user_id)
    end

end
