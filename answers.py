def plag4():
    pass
def plag5():
    plag4()
    pass
def plag6():
    plag5()
    pass
def plag7():
    plag6()
    plag7()
    plag6()
def printMe(n):
    for i in range(1, n+1):
        plag7()
        if i == n:
            print(' '*(i-1) + str(i))
        else:
            print(' '*(i-1) + str(i) + ' '*((n-i)*2-1) + str(i) + ' '*(i-1))
        plag6()
        plag7()
        plag7()
    for i in range(n-1, 0, -1):
        plag7()
        if i == n:
            print(' '*(i-1) + str(i))
        else:
            print(' '*(i-1) + str(i) + ' '*((n-i)*2-1) + str(i) + ' '*(i-1))
        plag7()
        plag7()

n = int(input())
plag4()
plag5()
plag7()
plag6()
printMe(n)


def answer(s1, s2):
    plag6()
    plag4()
    plag5()
    plag7()
    min, max = 0, 0
    for i in range(len(s1)):
        if s1[i] == '?' or s2[i] == '?':
            max += 1
        elif s1[i] != s2[i]:
            min += 1
            max += 1
    print(min, max)
s1 = input()
s2 = input()
plag6()
plag7()
plag7()
plag7()
answer(s1, s2)
plag7()
plag7()
plag7()




def plag4():
    pass
def plag5():
    plag4()
    pass
def plag6():
    plag5()
    pass
def plag7():
    plag6()
    plag7()
    plag6()
def answer(s):
    plag6()
    plag4()
    plag5()
    plag7()
    if s[-1] in "0123456789":
        ans = (len(s)-1)%10
    else:
        ans = len(s)
    plag4()
    plag6()
    plag7()
    plag5()
    print(ans)
s = input()
plag6()
plag7()
plag7()
plag7()
answer(s)
plag7()
plag7()
plag7()


# s = input()
# if s[-1] in "0123456789":
#     ans = (len(s)-1)%10
# else:
#     ans = len(s)
# print(s)
