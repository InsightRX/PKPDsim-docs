# Getting started

## Installation

At current, `PKPDsim` is not yet on CRAN (but it will be released to there soon). So you cannot use `install.packages()` yet to install it. However, the package can be installed directly from GitHub when you have the `devtools` package installed:

    library(devtools)
    install_github("ronkeizer/PKPDsim")
    library(PKPDsim)

## First simulation

The main simulation function in `PKPDsim` is `sim_ode()`. To be able to simulate a dosing regimen for a specific drug, at least the following **three** arguments are required:

- `model`: the model (created using the `new_ode_model()` function)
- `parameters`: a `list` of parameter values for the model
- `regimen`: the dosing regimen (created using the `new_regimen()` function)

The model library in PKPDsim contains a small selection of PK and PD models, but the main strength of course is it's ability to handle user-specified ODE systems. However, as a first example, let's implement the most simple example:

    p <- list(CL = 1, V  = 10, KA = 0.5)
    pk1 <- new_ode_model("pk_1cmt_oral")
    r1 <- new_regimen(amt = 100,
                      n = 5,
                      interval = 12)
    dat <- sim_ode (ode = "pk1",
                    par = p,
                    regimen = r1)

You probably noticed that the `new_ode_model()`-step took a few seconds to finish, while the simulation itself was in the order of milliseconds. In `new_ode_model`, the model is compiled to C++ binary code, which takes a few seconds. However, this has to be done only once. After compilation, the model is then available to be used in `sim_ode()` for as long as the R session is open.

So let's look at the output. `PKPDsim` will output data in the long format, i.e. one row per observed timepoint and split by compartment:

    > head(dat)
      id t comp         y
    1  1 0    1 100.00000
    2  1 1    1  60.65307
    3  1 2    1  36.78794
    4  1 3    1  22.31302
    5  1 4    1  13.53353
    6  1 5    1   8.20850

To check whether our simulation actually produced results, let's plot it (installation of `ggplot2` required).

    ggplot(dat, aes(x=t, y=y)) +
      geom_line() +
      facet_wrap(~comp)
