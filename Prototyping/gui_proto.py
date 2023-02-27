import curses
from curses import wrapper
import time
import os

class GUI_Handler():

    # Initializes the Terminal
    stdscr = curses.initscr()

    # A function which creates a base for a GUI-menu, with attributes for the button names, etc
    def updateMainHUD(self, column1_Title, column2_Title, column1_elements, column2_elements):
        """Updates the main window to correspond to the current screen and attributes that need to be displayed."""

        # Enables curses to understand key press as a text command
        self.stdscr.keypad(True)

        # All actual function below this
        print()

    # Terminating curses app
    def curses_off(self):
        """Terminates curses and resets terminal to its normal state."""

        curses.nocbreak()
        self.stdscr.keypad(False)
        curses.endwin()

class Screens():
    """A class for the different screen/window types of the program."""

    # Splash screen
    def splash_screen(self):
        """Splash screen stuff"""

        # Clearing screen
        GUI_Handler.stdscr.clear()
        # App doesn't display user's input on the terminal line (for the static GUI to work)
        curses.noecho()
        # User doesn't need to hit enter to input characters when cbreak function is called
        curses.cbreak()

        whole_name = []

        for i in "Console Carrier":
            whole_name.append(i)
            printable_name = "".join(whole_name)

            GUI_Handler.stdscr.addstr(
                int(os.get_terminal_size().lines/2), 
                int(os.get_terminal_size().columns/2-len(whole_name)/2), 
                str(printable_name),
                curses.A_REVERSE)

            GUI_Handler.stdscr.refresh()
            time.sleep(0.1)
        time.sleep(3)

    # Where the game asks for the airport
    def initial_setup():
        print("Setup")
    
    # The game's main window where your carriers planes are shown
    def main_window():
        print("Main")

screens = Screens()
screens.splash_screen()