class AppointmentsController < ApplicationController
    wrap_parameters format: []

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

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
        appointment = Appointment.create!(appointment_params.merge!({'user_id': current_user.id}))
        render json: appointment, status: :created
    end

    def update
        appointment = current_user.appointments.find_by(id: params[:id])
        if appointment
            appointment.update!(appointment_params)
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
        params.permit(:category, :start_date, :days, :notes, :pet_id, :sitter_id)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Appointment not found" }, status: :not_found
    end
end
