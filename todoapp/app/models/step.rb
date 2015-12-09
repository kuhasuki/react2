class Step < ActiveRecord::Base
  validates :body, :todo_id, presence: true
  validates :done, inclusion: [true, false]

  belongs_to :todo
end
