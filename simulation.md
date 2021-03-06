# Simulation

The `sim_ode()` function will combine the model, the parameters, and the regimen, and simulate out the ODE system. It will return a `data.frame` in the long format, i.e. one observation per row, and split by compartment and individual. The command for `sim_ode` looks e.g. like this:

    dat <- sim_ode(
      ode = model,              # created using new_ode_model()
      parameters = parameters,  # just a list of parameters
      regimen = regimen         # created using new_regimen
    )

By default, the observation times will include an observation every 1 hour. However, you can specify a vector of observation times to get only those observations:

    dat <- sim_ode(
      ode = model,
      parameters = parameters,
      regimen = regimen,
      t_obs = c(0.5, 2, 4, 8, 12, 16, 24)
    )
