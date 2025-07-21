
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import type { VocabularyWord } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Mic, MicOff, ArrowRight, RefreshCw, XCircle, CheckCircle, ServerCrash } from 'lucide-react';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';

interface SpeechTestViewerProps {
  words: VocabularyWord[];
}

type TestStatus = 'idle' | 'listening' | 'processing' | 'correct' | 'incorrect' | 'finished' | 'error';

// Helper to get the SpeechRecognition object, handling browser prefixes
const getSpeechRecognition = () => {
  if (typeof window !== 'undefined') {
    return window.SpeechRecognition || window.webkitSpeechRecognition;
  }
  return null;
};

export function SpeechTestViewer({ words }: SpeechTestViewerProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [status, setStatus] = useState<TestStatus>('idle');
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState(0);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'ja-JP';

    recognition.onstart = () => {
      setStatus('listening');
      setTranscript('');
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      checkAnswer(speechResult);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setStatus('error');
    };

    recognition.onend = () => {
      if (status === 'listening') {
        setStatus('idle');
      }
    };
    
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [status]); // Re-create if status changes in an unexpected way

  const checkAnswer = (spokenText: string) => {
    const currentWord = words[currentWordIndex];
    if (spokenText.trim() === currentWord.reading || spokenText.trim() === currentWord.japanese) {
      setStatus('correct');
      setScore(s => s + 1);
    } else {
      setStatus('incorrect');
    }
  };

  const handleStartListening = () => {
    if (recognitionRef.current && (status === 'idle' || status === 'error')) {
      try {
        recognitionRef.current.start();
      } catch(e) {
        console.error("Could not start recognition", e);
        setStatus('error');
      }
    }
  };

  const handleNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(i => i + 1);
      setStatus('idle');
      setTranscript('');
    } else {
      setStatus('finished');
    }
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setStatus('idle');
    setTranscript('');
  };

  if (!isSupported) {
    return (
      <div className="p-4 flex-1 flex items-center justify-center">
        <Alert variant="destructive">
          <ServerCrash className="h-4 w-4" />
          <AlertTitle>Browser Not Supported</AlertTitle>
          <AlertDescription>
            Your browser does not support the Web Speech API. Please try Chrome or Safari.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (status === 'finished') {
    return (
      <div className="p-4 flex-1 flex flex-col items-center justify-center text-center space-y-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Test Complete!</CardTitle>
            <CardDescription>You scored</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{score} / {words.length}</p>
            <p className="text-2xl font-semibold text-muted-foreground">({((score / words.length) * 100).toFixed(0)}%)</p>
            <Button onClick={handleRestart} className="mt-6">
              <RefreshCw className="mr-2 h-4 w-4" />
              Test Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentWord = words[currentWordIndex];

  return (
    <div className="flex flex-col w-full h-full p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <p>Word {currentWordIndex + 1} of {words.length}</p>
          <p>Score: {score}</p>
        </div>
        <Progress value={(currentWordIndex / words.length) * 100} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="font-headline text-primary drop-shadow-sm text-7xl md:text-8xl break-all">
              {currentWord.japanese}
            </p>
            <p className="text-muted-foreground mt-2 text-xl">{currentWord.meaning}</p>
          </CardContent>
        </Card>

        <Button 
          onClick={handleStartListening} 
          disabled={status === 'listening' || status === 'processing'}
          size="lg"
          className={cn(
            "w-full max-w-xs",
            status === 'listening' && 'bg-blue-600 hover:bg-blue-700 animate-pulse'
          )}
        >
          {status === 'listening' ? <Mic className="mr-2 h-5 w-5"/> : <MicOff className="mr-2 h-5 w-5" />}
          {status === 'listening' ? 'Listening...' : 'Start Listening'}
        </Button>
      </div>
      
      <div className="min-h-[120px]">
        {transcript && (
          <div className="space-y-4 animate-in fade-in">
            <div className={cn(
              "p-4 rounded-lg text-center",
              status === 'correct' && 'bg-green-100 dark:bg-green-900/50',
              status === 'incorrect' && 'bg-red-100 dark:bg-red-900/50',
            )}>
              <div className="flex items-center justify-center gap-2 mb-2">
                {status === 'correct' && <CheckCircle className="h-5 w-5 text-green-600" />}
                {status === 'incorrect' && <XCircle className="h-5 w-5 text-red-600" />}
                <p className="text-lg font-semibold">{transcript}</p>
              </div>
              {status === 'incorrect' && (
                <p className="text-sm text-muted-foreground">Correct: <span className="font-semibold text-accent">{currentWord.reading}</span></p>
              )}
            </div>
            
            {(status === 'correct' || status === 'incorrect') && (
              <Button onClick={handleNextWord} className="w-full">
                {currentWordIndex === words.length - 1 ? 'Finish Test' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
        {status === 'error' && (
           <Alert variant="destructive">
            <ServerCrash className="h-4 w-4" />
            <AlertTitle>An Error Occurred</AlertTitle>
            <AlertDescription>
                Speech recognition failed. Please check your microphone permissions and try again.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

    