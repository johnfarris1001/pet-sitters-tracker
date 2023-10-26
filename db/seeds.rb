# Pets

5.times do
    Pet.create(name: Faker::Creature::Cat.name, species: "Cat", breed: Faker::Creature::Cat.breed, weight: rand(6..15), age: rand(1..15), notes: Faker::Lorem.paragraph)
end

5.times do 
    Pet.create(name: Faker::Creature::Dog.name, species: "Dog", breed: Faker::Creature::Dog.breed, weight: rand(10..150), age: rand(1..15), notes: Faker::Lorem.paragraph)
end

# Sitters

10.times do
    Sitter.create(name: Faker::Name.name, has_home_with_yard: [true, false].sample, phone_number: Faker::PhoneNumber.cell_phone, address: Faker::Address.street_address, own_dogs: rand(0..2), own_cats: rand(0..2))
end

# Appointments

20.times do
    Appointment.create(category: ["Drop-in 1/2-hr", "Drop-in 1-hr", "House Sit", "Walk 1/2-hr", "Walk 1-hr", "Boarding", "Grooming", "Play Date"].sample, start_date: Faker::Date.between(from: '2023-09-01', to: '2023-10-31'), days: rand(0..7), notes: Faker::Lorem.paragraph, pet: Pet.all.sample, sitter: Sitter.all.sample)
end