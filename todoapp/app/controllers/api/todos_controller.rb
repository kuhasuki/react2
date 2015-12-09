class Api::TodosController < ApplicationController
  def index
    render json: Todo.all
  end

  def show
  end

  def create
    render json: Todo.create!(todo_params)
  end

  def destroy
    @todo = Todo.find(params[:id])
    render json: @todo.destroy!
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.update!(todo_params)
    render json: @todo
  end

  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end

end
