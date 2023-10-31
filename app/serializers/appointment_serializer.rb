class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :category, :start_date, :days, :notes, :pet, :sitter
end
