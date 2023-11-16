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

    def create
        appointment = Appointment.create(appointment_params)
        render json: appointment, status: :created
    end

    def update
        appointment = Appointment.find_by(id: params[:id])
        if appointment
            appointment.update(appointment_params)
            render json: appointment, status: :accepted
        else
            render json: { error: "Appointment not found" }, status: :not_found
        end
    end

    private

    def appointment_params
        params.permit(:category, :start_date, :days, :notes, :pet_id, :sitter_id, :user_id)
    end

end
