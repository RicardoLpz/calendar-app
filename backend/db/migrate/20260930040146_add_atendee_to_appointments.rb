class AddAtendeeToAppointments < ActiveRecord::Migration[7.2]
  def change
    add_column :appointments, :atendee, :json
  end
end
