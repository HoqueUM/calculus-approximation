
      //evaluating and rewriting user's inputted function 
      function f(x) {
        let coefficient = /([-+]?\d*\.?\d+)x/g;
        let fx = document.getElementById("fx").value;
        if (fx.includes("^")) {
          fx = fx.replace(/\^/g, "**");
        } 
        if (fx.includes("sin(")) {
          fx = fx.replace(/sin\(/g, "Math.sin(");
        }
        if (fx.includes("cos(")) {
          fx = fx.replace(/cos\(/g, "Math.cos(");
        }
        if (fx.includes("tan(")) {
          fx = fx.replace(/tan\(/g, "Math.tan(");
        }
        if (fx.includes("ln(")) {
          fx = fx.replace(/ln\(/g, "Math.log(");
        }
        if (fx.includes("sqrt(")) {
          fx = fx.replace(/sqrt\(/g, "Math.sqrt(");
        }
        if (fx.includes("abs(")) {
          fx = fx.replace(/abs\(/g, "Math.abs(");
        }
        
        fx = fx.replace(coefficient, '$1*x');

        try {
          eval(fx);
        } catch (e) {
          throw new Error("Expression cannot be parsed and evaluated by JavaScript: " + fx);
        }
        return eval(fx);
      }

      //estimating using riemann sums
      function riemann_sum() {
        let a = parseFloat(document.getElementById("a").value);
        let b = parseFloat(document.getElementById("b").value);
        let n = parseFloat(document.getElementById("n").value);
        let method = document.getElementById("method").value;
        document.getElementById("method").onchange = riemann_sum;
        const h = (b - a) / n;
        const x_vals = [];
        for (let i = 0; i <= n; i++){
          x_vals.push(a + i * h);
        }
        let approx = 0;
        if (method === 'left') {
          for (let i = 0; i < n; i++){
            approx += f(a + i * h);
          }
          approx *= h;
          approx = parseFloat(approx.toFixed(3));
          document.getElementById("output").innerHTML = "Left-side approximation: " + approx;
        } else if (method === 'right') {
            for (let i = 0; i < n; i++){
              approx += f(a + (i + 1) * h);
            }
            approx *= h;
            approx = parseFloat(approx.toFixed(3));
            document.getElementById("output").innerHTML = "Right-side approximation: " + approx;
        } else if (method === 'midpoint') {
            for (let i = 0; i < n; i++) {
              approx += f(x_vals[i] + h / 2) * h;
            }
            approx = approx.toFixed(3);
            document.getElementById("output").innerHTML = "Midpoint approximation: " + approx;
        } else if (method === 'trapezoid') {
            approx = (f(a) + f(b)) / 2;
            for (let i = 1; i < n; i++){
              approx += f(a + i * h);
            }
            approx *= h;
            approx = parseFloat(approx.toFixed(3));
            document.getElementById("output").innerHTML = "Trapezoid approximation: " + approx;
        } else if (method === 'simpson') {
          for (let i = 1; i <= n/2; i++) {
            approx += (f(x_vals[2 * i - 2]) + 4*f(x_vals[2 * i - 1]) + f(x_vals[2 * i]));
          }
            approx *= (h/3);
            approx = parseFloat(approx.toFixed(3));
            document.getElementById("output").innerHTML = "Simpson's Rule approximation: " + approx;
    
        } else { 
            throw new Error("Invalid method. Choose from 'left', 'right', 'midpoint', 'trapezoid', or 'simpson'."); 
        }
        
        return approx;
        try {
            let a = parseFloat(document.getElementById("a").value);
            let b = parseFloat(document.getElementById("b").value);
            let n = parseFloat(document.getElementById("n").value);
            if (isNaN(a) || isNaN(b) || isNaN(n)) {
                throw new Error("Invalid input. a, b, and n must be numbers.");
            }
            if (n <= 0) {
                throw new Error("Invalid input. n must be positive.");
            }
            let method = document.getElementById("method").value;
            if (['left', 'right', 'midpoint', 'trapezoid', 'simpson'].indexOf(method) === -1) {
                throw new Error("Invalid method. Choose from 'left', 'right', 'midpoint', 'trapezoid', or 'simpson'.");
            }
            let approx = riemann_sum_helper();
            document.getElementById("output").innerHTML = approx;
            return approx;
            } catch (e) {
            document.getElementById("output").innerHTML = "Error: " + e.message;
        }
    }   