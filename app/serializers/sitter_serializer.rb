class SitterSerializer < ActiveModel::Serializer
  attributes :id, :name, :has_home_with_yard, :phone_number, :address, :own_cats, :own_dogs
end
