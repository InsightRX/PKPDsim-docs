# Plotting

Although data generated with `PKPDsim` can of course be plotted with any plotting library, some guidance is given below for plotting the data with `ggplot2` and with the `PKPDplot` library (based on `ggplot2`). The latter library is a complimentary library to `PKPDsim` and makes it easy and fast to create the most common plots for PKPD simulations.

## Using ggplot

The output dataset from `sim_ode()` can be fed into `ggplot2` without modification, use either:

    ggplot(dat, aes(x = t, y = y, group=id)) + geom_line()

or using the `dplyr` / `magittr` approach:

    dat %>% ggplot(aes(x = t, y = y, group=id)) + geom_line()

If you used the option `only_obs=FALSE` (which is default), then you will have observations from all compartments in your dataset. Hence, you will have to facet the plot to make separate plots per compartment:

    ggplot(dat, aes(x = t, y = y, group=id)) +
      geom_line() +
      facet_wrap(~comp)

## Using PKPDplot

While `ggplot2` is extremely versatile and can basically make any plot of your data that you dream of, most often you'll probably just want a simple plot of the PK profile for a single patient or an overview of the population, e.g. with a confidence interval. The add-on library `PKPDplot` (available from [GitHub](https://github.com/ronkeizer/PKPDplot)) takes away most of the burden of creating these standard plots. It will only show observations, and automatically switch between a plot for a single individual and a population. The plot can be customized using the `show` argument, as is shown in the examples below.

The library is installed from GitHub:

    devtools::install_github("ronkeizer/PKPDplot")

After loading the library `PKPDplot`, the `plot()` function will be extended with a specific plotting function for datasets of created by PKPDsim. Create a plot using simply:

    library(PKPDplot)
    plot(dat)    

or

    library(PKPDplot)
    dat %>% plot()

### Customization options

Various customization options allow you to include or hide elements in the plot. They can be specified using the `show_single` and `show_population` arguments for plots for data for single or multiple individuals, respectively. For example:

    plot(dat, show_population(
      obs = TRUE, spaghetti = FALSE,
      ci = TRUE, median = TRUE,
      regimen = TRUE))    

to show a plot for a population, with the observed concentrations as points and also a confidence interval and median line. The `regimen` option decides whether the doses are shown as a line (bolus) or box (infuion) in the plot.

The defaults are:

    show_single = list(
      obs = TRUE,
      spaghetti = TRUE,
      ci = FALSE,
      median = FALSE,
      regimen = TRUE
    )

    show_population = list(
      obs = FALSE,
      spaghetti = TRUE,
      ci = FALSE,
      median = TRUE,
      regimen = TRUE
    )

### Theming options

Besides showing/hiding elements in the plot, the elements can also be styled using the `new_plot_theme()` function and the `theme` argument. An example is shown below:

    plot(dat,
      theme = new_plot_theme(
        ci_fill         = rgb(0.8, 0.5, 0.8, 0.2),
        median_color    = rgb(0.15, 0.2, 0.6, 0.6),
        obs_size        = 1,
        obs_color       = rgb(0.5, 0.5, 0, 0.5)
      )
    )

The defaults are:

    spaghetti_color = rgb(0.5, 0.5, 0.5, 0.5),
    dose_fill       = rgb(0.2, 0.2, 0.2, 0.2),
    target_fill     = rgb(0.3, 0.4, 0.6, 0.15),
    target_color    = rgb(0.4, 0, 0, 0.5),
    ci_fill         = rgb(0.8, 0.5, 0.8, 0.2),
    median_color    = rgb(0.15, 0.2, 0.6, 0.6),
    obs_size        = 2,
    obs_color       = rgb(0, 0, 0, 0.5)

For more elaborate theming of these and other plot elements, please use the options available in `ggplot2`. You can e.g. add a specific theme on top of the standard call to `plot()`:

    plot(dat) + theme_bw()

where `theme_bw` is a `ggplot2` theme (`theme_bw` is a default theme, but you can easily create your own).
