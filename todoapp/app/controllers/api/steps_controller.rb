class Api::StepsController < ApplicationController
  def index
    render json: Step.all
  end

  def show
  end

  def create
    render json: Step.create!(step_params)
  end

  def destroy
    @step = Step.find(params[:id])
    render json: @step.destroy!
  end

  def update
    @step = Step.find(params[:id])
    @step.update!(step_params)
    render json: @step
  end

  def step_params
    params.require(:step).permit(:body, :todo_id, :done)
  end
end
