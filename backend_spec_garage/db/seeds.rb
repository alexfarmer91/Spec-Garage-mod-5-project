require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# 10.times do
#  User.create(username: Faker::Internet.username, email: Faker::Internet.email, location: (Faker::Address.city + ", " + Faker::Address.state), password: "password", bio: Faker::Hipster.sentence(word_count: 6), avatar: "https://i.kym-cdn.com/photos/images/newsfeed/001/422/647/bc3.png")
# end
uidnos = (6..15).to_a

20.times do
    manuf = Faker::Vehicle.make
    mod = Faker::Vehicle.model(make_of_model: manuf)
  Car.create(year: Faker::Vehicle.year, make: manuf, model: mod, trim: Faker::Vehicle.style, nickname: Faker::Hipster.sentence(word_count: 1), user_id: uidnos.sample)
end 
