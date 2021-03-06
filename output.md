# Output

Output from `sim_ode()` is in the form of a `data.frame`. The output is in the long format, and split by compartment. This makes the output ready for plotting e.g. with `ggplot2` (see section on *plotting*).

By default, `sim_ode()` will return a `data.frame` with the data for all compartments. If you are only interested in the observed data (i.e. the concentrations in the case of PK), you can select only those by specifying the `only_obs = TRUE` option. Please note that the `comp` column in the dataset will have the indices for all the compartments, as well as an extra set of rows for the `"obs"`
 (observation) data, which is scaled by the scaling factor specified in the model.

The output for the observation, as well as the compartment from which the observation is taken can be set using the `obs` argument:

    mod <- new_ode_model(code = "
      dAdt[1] = -KA * A[1];
      dAdt[2] = -(CL/V) * A[2] + KA*A[1];
    ", obs = list(cmt = 2, scale = "V"))

### Multiple observation types

If you would like to output more than one observation type, such as the concentration of the parent drug and the concentration of the metabolite, you can control that using the `obs` argument. Below is an example where the amount in the absorption compartment as well as the systemic drug concentration are outputted.

    mod <- new_ode_model(code = "
      dAdt[1] = -KA * A[1];
      dAdt[2] = -(CL/V) * A[2] + KA*A[1];
    ", obs = list(cmt = c(2, 2),
                  scale = c(1, "V"),
                  label = c("abs", "conc")))

    par <- list(CL = 5, V = 50, KA = .5)
    reg <- new_regimen(amt = 100, n = 5, interval = 12)
    res <- sim_ode(ode = mod, parameters = par, regimen = reg, only_obs = T)

### Parameters, variables, and covariates

It is often useful to include model parameters, generated variables, and/or covariates in the output table as well, especially if covariates and between-subject variability is included in the simulation. Use the `output_include` argument for this:

    dat <- sim(pk1, parameters = p, regimen = reg,
      covariates_table = cov_table,
      covariates_implementation = list(SCR = "interpolate"),
      omega = c(0.1, 0.05, 0.1), n_ind = 50,
      output_include = list
        parameters = TRUE,
        variables = TRUE,
        covariates = TRUE)
    )
