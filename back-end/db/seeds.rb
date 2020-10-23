User.destroy_all
Game.destroy_all

ben = User.create(name: "Ben", username: "benlooper@gmail.com", password: "1234", image_url:"https://ca.slack-edge.com/T02MD9XTF-U019S6PAB9N-0cd5bdbb3148-512")
# bree = User.create(name: "Bree", username: "ambreea.warren@gmail.com", password: "3693", image_url: "https://ca.slack-edge.com/T02MD9XTF-U014PHQJDB6-b1c7816d3d41-512")

# bree_game = Game.create(score: 10, reaction: "😎", user_id: bree.id)

ben_game_one = Game.create(score: 12, reaction:"🤬", user_id: ben.id)
ben_game_two = Game.create(score: 10, reaction:"😎", user_id: ben.id)


puts "Good to go!"