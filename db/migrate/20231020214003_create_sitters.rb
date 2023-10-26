class CreateSitters < ActiveRecord::Migration[6.1]
  def change
    create_table :sitters do |t|
      t.string :name
      t.boolean :has_home_with_yard
      t.string :phone_number
      t.string :address
      t.integer :own_dogs
      t.integer :own_cats

      t.timestamps
    end
  end
end
