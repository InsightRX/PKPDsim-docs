# Regimen

Regimens are defined using the `new_regimen()` function. You should provide information on the dose amount, how many doses, and the dosing interval. However, how you provide that information is very flexible. You can e.g. specify:

    reg1 <- new_regimen(
      amt = 100,
      interval = 12,
      n = 5
    )

which will administer 5 doses of 100 mg (or whatever the unit is), at an interval of 12 hours. The same can however also be specified as:

    reg1 <- new_regimen(
      amt = 100,
      times = c(0, 12, 24, 36, 48)
    )

or:

    reg1 <- new_regimen(
      amt = c(100, 100, 100, 100, 100),
      times = c(0, 12, 24, 36, 48)
    )

Be careful: if the length of the `amt` vector is not the same as the lenght in `times`, the function will repeat the first `amt` specified. The same goes for the arguments `type`, `cmt`, and `t_inf`.

By default, the `new_regimen_function()` function assumes the dose is given as bolus. If you want to specify that these should be given as infusion, use the following:

    reg1 <- new_regimen(
      amt = 100,
      times = c(0, 12, 24, 36, 48),
      type = "infusion"
    )

When you created the model using `new_ode_model`, you also specified a default dosing compartment. If you didn't specify the `dose` argument, the default dosing compartment is 1. Now, should you want to administer the dose into a different compartment, you can override it with the `cmt` argumentfunction:

    reg1 <- new_regimen(
      amt = 100,
      times = c(0, 12, 24, 36, 48),
      cmt = c(1, 1, 2, 2, 3)
    )

Which will administer the doses to compartments 1, 1, 2, 2, and 3, respectively (of course this is a hypothetical example).

*Note: `PKPDsim` doesn't care about what unit the dose is in, you have to define this yourself in conjunction with the model code and observation scale.*

## Steady state

Instead of simulating the full concentration time course for a give model,
if you want to simulate the PK(PD) at steady state, you can also specify
the `ss=TRUE` argument to `new_regimen()`, which will then simulate the
regimen at steady state. By default, steady state is assumed to occur after
5 days (PKPDsim doesn't check if steady state is reached!), but if you want
to decrease or increase this you can do so by specifying the `n_ss` argument
which takes the number of doses to simulate before assuming steady state.