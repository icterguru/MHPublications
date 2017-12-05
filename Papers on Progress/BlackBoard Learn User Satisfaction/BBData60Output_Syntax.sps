IF  (q7="Totally Dissatisfied") q07=1.
EXECUTE.

IF  (q7="Dissatisfied") q07=2.
EXECUTE.

IF  (q7="Neutral") q07=3.
EXECUTE.

IF  (q7="Satisfied") q07=4.
EXECUTE.

IF  (q7="Totally Satisfied") q07=5.
EXECUTE.

IF  (q8="Totally Dissatisfied") q08=1.
EXECUTE.

IF  (q8="Dissatisfied") q08=2.
EXECUTE.

IF  (q8="Neutral") q08=3.
EXECUTE.

IF  (q8="Satisfied") q08=4.
EXECUTE.

IF  (q8="Totally Satisfied") q08=5.
EXECUTE.

IF  (q9="Totally Dissatisfied") q09=1.
EXECUTE.

IF  (q9="Dissatisfied") q09=2.
EXECUTE.

IF  (q9="Neutral") q09=3.
EXECUTE.

IF  (q9="Satisfied") q09=4.
EXECUTE.

IF  (q9="Totally Satisfied") q09=5.
EXECUTE.

IF  (q10="Totally Dissatisfied") q010=1.
EXECUTE.

IF  (q10="Dissatisfied") q010=2.
EXECUTE.

IF  (q10="Neutral") q010=3.
EXECUTE.

IF  (q10="Satisfied") q010=4.
EXECUTE.

IF  (q10="Totally Satisfied") q010=5.
EXECUTE.

IF  (q11="Totally Dissatisfied") q011=1.
EXECUTE.

IF  (q11="Dissatisfied") q011=2.
EXECUTE.

IF  (q11="Neutral") q011=3.
EXECUTE.

IF  (q11="Satisfied") q011=4.
EXECUTE.

IF  (q11="Totally Satisfied") q011=5.
EXECUTE.

IF  (q12="Totally Dissatisfied") q012=1.
EXECUTE.

IF  (q12="Dissatisfied") q012=2.
EXECUTE.

IF  (q12="Neutral") q012=3.
EXECUTE.

IF  (q12="Satisfied") q012=4.
EXECUTE.

IF  (q12="Totally Satisfied") q012=5.
EXECUTE.


IF  (q13="Totally Dissatisfied") q013=1.
EXECUTE.

IF  (q13="Dissatisfied") q013=2.
EXECUTE.

IF  (q13="Neutral") q013=3.
EXECUTE.

IF  (q13="Satisfied") q013=4.
EXECUTE.

IF  (q13="Totally Satisfied") q013=5.
EXECUTE.


IF  (q14="Totally Dissatisfied") q014=1.
EXECUTE.

IF  (q14="Dissatisfied") q014=2.
EXECUTE.

IF  (q14="Neutral") q014=3.
EXECUTE.

IF  (q14="Satisfied") q014=4.
EXECUTE.

IF  (q14="Totally Satisfied") q014=5.
EXECUTE.


IF  (q15="Totally Dissatisfied") q015=1.
EXECUTE.

IF  (q15="Dissatisfied") q015=2.
EXECUTE.

IF  (q15="Neutral") q015=3.
EXECUTE.

IF  (q15="Satisfied") q015=4.
EXECUTE.

IF  (q15="Totally Satisfied") q015=5.
EXECUTE.

IF  (q16="Totally Dissatisfied") q016=1.
EXECUTE.

IF  (q16="Dissatisfied") q016=2.
EXECUTE.

IF  (q16="Neutral") q016=3.
EXECUTE.

IF  (q16="Satisfied") q016=4.
EXECUTE.

IF  (q16="Totally Satisfied") q016=5.
EXECUTE.

IF  (q17="Totally Dissatisfied") q017=1.
EXECUTE.

IF  (q17="Dissatisfied") q017=2.
EXECUTE.

IF  (q17="Neutral") q017=3.
EXECUTE.

IF  (q17="Satisfied") q017=4.
EXECUTE.

IF  (q17="Totally Satisfied") q017=5.
EXECUTE.

IF  (q18="Totally Dissatisfied") q018=1.
EXECUTE.

IF  (q18="Dissatisfied") q018=2.
EXECUTE.

IF  (q18="Neutral") q018=3.
EXECUTE.

IF  (q18="Satisfied") q018=4.
EXECUTE.

IF  (q18="Totally Satisfied") q018=5.
EXECUTE.

IF  (q19="Totally Dissatisfied") q019=1.
EXECUTE.

IF  (q19="Dissatisfied") q019=2.
EXECUTE.

IF  (q19="Neutral") q019=3.
EXECUTE.

IF  (q19="Satisfied") q019=4.
EXECUTE.

IF  (q19="Totally Satisfied") q019=5.
EXECUTE.

IF  (q20="Totally Dissatisfied") q020=1.
EXECUTE.

IF  (q20="Dissatisfied") q020=2.
EXECUTE.

IF  (q20="Neutral") q020=3.
EXECUTE.

IF  (q20="Satisfied") q020=4.
EXECUTE.

IF  (q20="Totally Satisfied") q020=5.
EXECUTE.

IF  (q21="Totally Dissatisfied") q021=1.
EXECUTE.

IF  (q21="Dissatisfied") q021=2.
EXECUTE.

IF  (q21="Neutral") q021=3.
EXECUTE.

IF  (q21="Satisfied") q021=4.
EXECUTE.

IF  (q21="Totally Satisfied") q021=5.
EXECUTE.

IF  (q22="Totally Dissatisfied") q022=1.
EXECUTE.

IF  (q22="Dissatisfied") q022=2.
EXECUTE.

IF  (q22="Neutral") q022=3.
EXECUTE.

IF  (q22="Satisfied") q022=4.
EXECUTE.

IF  (q22="Totally Satisfied") q022=5.
EXECUTE.


NPAR TESTS
  /M-W= median BY gender(1 2)
  /STATISTICS=DESCRIPTIVES
  /MISSING ANALYSIS.


